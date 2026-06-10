'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Save, Upload, X } from 'lucide-react';
import RichEditor from './RichEditor';
import MultiImageUploader, { ImageItem } from './MultiImageUploader';
import { slugify } from '@/lib/slug';

type Category = { id: number; name: string };
type LocaleStrings = Record<'fr' | 'es' | 'ar', string>;

type Props = {
  mode: 'create' | 'edit';
  productId?: number;
  initial?: {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    specs?: string;
    specsPdf?: string;
    formula?: string;
    formulaPdf?: string;
    featured?: boolean;
    images: ImageItem[];
    categoryIds: number[];
    skus?: unknown[];
    translations?: {
      name: LocaleStrings;
      shortDescription: LocaleStrings;
      description: LocaleStrings;
      specs?: LocaleStrings;
      formula?: LocaleStrings;
    };
  };
  categories: Category[];
};

const emptyLocale: LocaleStrings = { fr: '', es: '', ar: '' };

export default function ProductForm({ mode, productId, initial, categories }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [shortDescription, setShortDescription] = useState(initial?.shortDescription || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [specs, setSpecs] = useState(initial?.specs || '');
  const [specsPdf, setSpecsPdf] = useState(initial?.specsPdf || '');
  const [formula, setFormula] = useState(initial?.formula || '');
  const [formulaPdf, setFormulaPdf] = useState(initial?.formulaPdf || '');
  const [featured, setFeatured] = useState(!!initial?.featured);
  const [images, setImages] = useState<ImageItem[]>(initial?.images || []);
  const [categoryIds, setCategoryIds] = useState<number[]>(initial?.categoryIds || []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const translations = initial?.translations || {
    name: emptyLocale,
    shortDescription: emptyLocale,
    description: emptyLocale,
    specs: emptyLocale,
    formula: emptyLocale,
  };

  function onNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function toggleCategory(id: number) {
    setCategoryIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  async function uploadPdf(file: File, setter: (url: string) => void) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (!res.ok) {
      alert('Upload PDF failed');
      return;
    }
    const { url } = await res.json();
    setter(url);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${productId}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          shortDescription,
          description,
          specs,
          specsPdf,
          formula,
          formulaPdf,
          images,
          categoryIds,
          featured,
          skus: [],
          nameFr: translations.name.fr,
          nameEs: translations.name.es,
          nameAr: translations.name.ar,
          shortDescriptionFr: translations.shortDescription.fr,
          shortDescriptionEs: translations.shortDescription.es,
          shortDescriptionAr: translations.shortDescription.ar,
          descriptionFr: translations.description.fr,
          descriptionEs: translations.description.es,
          descriptionAr: translations.description.ar,
          specsFr: translations.specs?.fr || '',
          specsEs: translations.specs?.es || '',
          specsAr: translations.specs?.ar || '',
          formulaFr: translations.formula?.fr || '',
          formulaEs: translations.formula?.es || '',
          formulaAr: translations.formula?.ar || '',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Save failed');
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin/products" className="inline-flex items-center gap-2 text-slate-600 font-medium hover:text-slate-800">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 bg-brand-primary text-white px-5 py-2.5 rounded-xl font-bold shadow hover:opacity-90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" /> {busy ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm rounded-xl border border-red-200 px-4 py-3">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Slug *</label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 font-mono text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">Used in the public URL: /products/{slug || 'product-slug'}</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const active = categoryIds.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                    active
                      ? 'bg-brand-primary text-white border-brand-primary'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary'
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
            {categories.length === 0 && <span className="text-sm text-slate-400">Create categories first if you need filtering.</span>}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer pt-4 border-t border-slate-100">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 rounded text-brand-primary border-slate-300 focus:ring-brand-primary/20"
          />
          <span className="text-sm font-bold text-slate-700">Show this product in Featured products</span>
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <MultiImageUploader label="Product Images" value={images} onChange={setImages} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Short Description</h3>
        <RichEditor value={shortDescription} onChange={setShortDescription} minHeight={150} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-700 mb-3">Full Description</h3>
        <RichEditor value={description} onChange={setDescription} minHeight={360} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-700">Specs & Export Notes</h3>
        <RichEditor value={specs} onChange={setSpecs} minHeight={220} />
        <PdfUpload label="Specs PDF" value={specsPdf} onChange={setSpecsPdf} onUpload={uploadPdf} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-700">Formula / MSDS</h3>
        <RichEditor value={formula} onChange={setFormula} minHeight={180} />
        <PdfUpload label="Formula / MSDS PDF" value={formulaPdf} onChange={setFormulaPdf} onUpload={uploadPdf} />
      </div>
    </form>
  );
}

function PdfUpload({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File, setter: (url: string) => void) => Promise<void>;
}) {
  const inputId = `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-upload`;

  return (
    <div className="pt-4 border-t border-slate-100 space-y-2">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</label>
      <div className="flex items-center gap-3 flex-wrap">
        <input
          id={inputId}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file, onChange);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => document.getElementById(inputId)?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
        >
          <Upload className="w-3.5 h-3.5" /> Upload PDF
        </button>

        {value && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600">
            <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
            <a href={value} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-brand-primary truncate max-w-xs">
              {value.split('/').pop()}
            </a>
            <button type="button" onClick={() => onChange('')} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-rose-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
