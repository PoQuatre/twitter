import type { Express, Response } from 'express';
import path from 'path';
import fs from 'fs';
import resolvePkg from 'resolve-package-path';
import { createServer, ViteDevServer } from 'vite';
import express from 'express';

const renderIndex = async (
  res: Response,
  url: string,
  template: string,
  render: (url: string) => string,
  errCb?: (err: any) => void,
) => {
  try {
    const appHtml = render(url);

    // TODO find a way to add redirections

    const html = template.replace(`<!--srr-root-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e: any) {
    errCb && errCb(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
};

export const registerClient = async (app: Express) => {
  const clientPkg = resolvePkg('client', '.');
  if (!clientPkg) {
    throw new Error("Cannot find the 'client' package!");
  }

  const clientRoot = path.dirname(clientPkg);
  const resolve = (p: string | string[]) =>
    path.resolve(clientRoot, ...(typeof p === 'string' ? [p] : p));

  const isProd = process.env.NODE_ENV === 'production';
  const prodTemplate = isProd
    ? fs.readFileSync(resolve('dist/ssr-client/index.html'), 'utf-8')
    : '';

  let vite: ViteDevServer;
  if (!isProd) {
    vite = await createServer({
      root: clientRoot,
      server: { middlewareMode: 'ssr' },
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
      const url = req.originalUrl;

      let template = fs.readFileSync(resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;

      await renderIndex(res, url, template, render, (e) => {
        vite.ssrFixStacktrace(e);
      });
    });
  } else {
    app.use(express.static(resolve('dist/ssr-client'), { index: false }));

    const render = (await import('client/dist/ssr/entry-server.js')).render;

    app.use('*', async (req, res) => {
      await renderIndex(res, req.originalUrl, prodTemplate, render);
    });
  }
};
