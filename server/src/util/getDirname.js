// @ts-nocheck
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export function getDirname() {
    return dirname(fileURLToPath(import.meta.url))
}
