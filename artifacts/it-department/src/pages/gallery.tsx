import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useStore, GalleryItem } from "@/lib/store";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);
  const store = useStore();

  return (
    <div className="py-12 flex-1 container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-gradient">Зургийн Цомог</h1>
        <p className="text-secondary">МТ Тэнхимийн өдөр тутмын амьдрал</p>
      </motion.div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {store.gallery.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="break-inside-avoid"
          >
            <div 
              className="glow-card relative group rounded-2xl overflow-hidden cursor-pointer border border-border bg-card"
              onClick={() => setSelectedImg(img)}
            >
              <div className="aspect-[4/3] w-full bg-muted">
                <img 
                  src={img.imageUrl} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <ZoomIn className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 scale-50 group-hover:scale-100" />
                <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
                <p className="text-white/70 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-5xl w-full bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-2/3 bg-black flex items-center justify-center">
                <img src={selectedImg.imageUrl} alt={selectedImg.title} className="max-w-full max-h-[70vh] object-contain" />
              </div>
              <div className="w-full md:w-1/3 p-8 flex flex-col bg-card">
                <h2 className="text-2xl font-bold mb-2">{selectedImg.title}</h2>
                <p className="text-accent text-sm mb-6">{selectedImg.date}</p>
                <p className="text-secondary leading-relaxed flex-1">{selectedImg.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
