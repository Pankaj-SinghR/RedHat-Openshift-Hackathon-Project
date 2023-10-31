#!/bin/sh
npx prisma migrate deploy
node storer.js