import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a PDF Blob from a DOM element.
 * @param {HTMLElement} element - The DOM element to capture.
 * @param {object} [options]
 * @param {number} [options.scale] - Canvas scale multiplier.
 * @param {number} [options.marginMm] - Page margin in mm.
 * @returns {Promise<Blob>} - The resulting PDF Blob.
 */
export const generatePDFBlob = async (element, options = {}) => {
  if (!element) return null;

  try {
    const scale = typeof options.scale === 'number' ? options.scale : 2;
    const marginMm = typeof options.marginMm === 'number' ? options.marginMm : 10;

    // Create PDF first to get page metrics.
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    const pageWidthMm = pdf.internal.pageSize.getWidth();
    const pageHeightMm = pdf.internal.pageSize.getHeight();
    const contentWidthMm = pageWidthMm - marginMm * 2;
    const contentHeightMm = pageHeightMm - marginMm * 2;

    // We slice the DOM into page-sized canvases to avoid giant canvases and "blank PDF" failures.
    const elementWidthPx = Math.max(element.scrollWidth, element.clientWidth);
    const elementHeightPx = Math.max(element.scrollHeight, element.clientHeight);

    // Convert PDF content height (mm) into pixels at the target scale.
    // pxPerMm is derived from element width to keep aspect correct.
    const pxPerMm = (elementWidthPx * scale) / contentWidthMm;
    const pageSliceHeightPx = Math.floor(contentHeightMm * pxPerMm);

    let offsetPx = 0;
    let isFirstPage = true;

    while (offsetPx < elementHeightPx * scale) {
      // Crop capture region.
      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: elementWidthPx,
        height: Math.min(pageSliceHeightPx / scale, elementHeightPx - offsetPx / scale),
        windowWidth: elementWidthPx,
        windowHeight: Math.min(pageSliceHeightPx / scale, elementHeightPx - offsetPx / scale),
        x: 0,
        y: offsetPx / scale,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const sliceHeightMm = (canvas.height * contentWidthMm) / canvas.width;

      if (!isFirstPage) pdf.addPage();
      isFirstPage = false;

      pdf.addImage(
        imgData,
        'JPEG',
        marginMm,
        marginMm,
        contentWidthMm,
        Math.min(sliceHeightMm, contentHeightMm),
        undefined,
        'FAST'
      );

      offsetPx += pageSliceHeightPx;
    }

    return pdf.output('blob');
  } catch (error) {
    console.error('PDF Generation failed:', error);
    throw error;
  }
};
