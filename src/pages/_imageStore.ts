import path from 'node:path';

const blogRaw = import.meta.glob<{ default: any }>('../content/blog/**/*.{png,jpg,jpeg,gif,webp,svg}', {
  eager: true,
  query: '?url',
});

const imageMap: Record<string, string> = {};

function buildMap(glob: typeof blogRaw) {
  for (const [key, mod] of Object.entries(glob)) {
    const val: any = mod;
    const inner = val?.default || val;
    const url = typeof inner === 'string' ? inner : (inner?.src || '');
    if (url) {
      const cleanKey = key.replace(/^\.\.\/content\//, '');
      imageMap[cleanKey] = url;
    }
  }
}

buildMap(blogRaw);

export function resolveCover(collection: string, entryId: string, cover?: string): string | undefined {
  if (!cover) return undefined;
  if (!cover.startsWith('./') && !cover.startsWith('../')) return cover;

  // index.md(x) 由来のエントリは id がディレクトリ名そのものになるため、
  // id 自体をディレクトリとして探し、見つからなければ親ディレクトリも試す
  const idParts = entryId.split('/');
  const candidateDirs = [idParts.join('/'), idParts.slice(0, -1).join('/')];

  for (const dir of candidateDirs) {
    const contentDir = dir ? `${collection}/${dir}/` : `${collection}/`;
    const lookupKey = path.normalize(`${contentDir}${cover}`);
    if (imageMap[lookupKey]) return imageMap[lookupKey];
  }

  return cover;
}
