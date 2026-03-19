// Safe wrapper around pdf-parse that bypasses the test-file side-effect
// in index.js which crashes in Next.js bundler environments.
//
// pdf-parse@1.1.1 index.js checks `module.parent` and if falsy, tries to
// read `./test/data/05-versions-space.pdf` which doesn't exist in production.

let pdfParseFn = null;

export async function parsePDF(buffer) {
  try {
    if (!pdfParseFn) {
      // Dynamic import to avoid bundler issues
      const mod = await import('pdf-parse/lib/pdf-parse.js');
      pdfParseFn = mod.default || mod;
    }
    if (typeof pdfParseFn !== 'function') {
      console.error('pdf-parse is not a function:', pdfParseFn);
      throw new Error('PDF parser not initialized correctly');
    }
    const data = await pdfParseFn(buffer);
    return data?.text || '';
  } catch (err) {
    console.error('parsePDF Internal Error:', err);
    throw err;
  }
}
