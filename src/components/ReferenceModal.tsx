import { Download, X } from 'lucide-react';
import { REFERENCE_PLATES } from '../data/neuroanatomy';

interface ReferenceModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReferenceModal({ open, onClose }: ReferenceModalProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reference-plates-title"
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 p-4"
    >
      <div className="w-full max-w-5xl max-h-[88vh] flex flex-col bg-[#0c1018] border border-white/14 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 id="reference-plates-title" className="text-base font-semibold text-white">
              Anatomical Specimen Reference Plates
            </h2>
            <p className="text-xs text-[#8b95a7] mt-0.5">
              High-resolution lateral, midsagittal, and ventral neuroanatomy plates for visual comparison and download
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reference plates"
            className="p-2 text-[#9aa4b4] hover:text-white rounded-lg hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto atlas-scroll grid grid-cols-1 md:grid-cols-3 gap-5">
          {REFERENCE_PLATES.map((plate) => (
            <article
              key={plate.id}
              className="flex flex-col bg-[#07090e] border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-[#0a0d14] overflow-hidden">
                <img
                  src={plate.imageUrl}
                  alt={plate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="text-[11px] font-medium text-[#8b95a7]">
                    {plate.viewLabel}
                  </div>
                  <h3 className="text-sm font-semibold text-white mt-0.5">
                    {plate.title}
                  </h3>
                  <p className="text-xs text-[#9aa4b4] leading-relaxed mt-1.5">
                    {plate.caption}
                  </p>
                  <ul className="mt-3 space-y-1 border-t border-white/8 pt-2.5">
                    {plate.structures.map((item) => (
                      <li key={item} className="text-[11px] text-[#cbd5e1]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plate.imageUrl}
                  download={`${plate.id}.jpg`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#172030] hover:bg-[#1f2b40] border border-white/10 rounded-lg transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Save Plate</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
