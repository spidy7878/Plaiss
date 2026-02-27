'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, X, ArrowLeft, Loader2 } from 'lucide-react'
import type { Product } from '@/lib/product-types'

// ─── Types ────────────────────────────────────────────────────────────────────
type ProductFormData = Omit<Product, 'id'>

const EMPTY_FORM: ProductFormData = {
  name: '',
  price: 0,
  colors: [{ hex: '#9E9E9E', name: 'Gray' }],
  image: '',
  isNew: false,
  category: '',
  description: '',
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>(EMPTY_FORM)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ── Fetch products ──
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // ── Handlers ──
  function openCreate() {
    setEditingProduct(null)
    setFormData(EMPTY_FORM)
    setIsCreating(true)
    setError('')
  }

  function openEdit(product: Product) {
    setIsCreating(false)
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      colors: product.colors,
      image: product.image,
      isNew: product.isNew,
      category: product.category,
      description: product.description ?? '',
    })
    setError('')
  }

  function closeForm() {
    setEditingProduct(null)
    setIsCreating(false)
    setFormData(EMPTY_FORM)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      if (isCreating) {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to create')
        }
        setSuccess('Product created successfully!')
      } else if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to update')
        }
        setSuccess('Product updated successfully!')
      }

      closeForm()
      await fetchProducts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setSuccess('Product deleted successfully!')
      await fetchProducts()
    } catch {
      setError('Failed to delete product')
    }
  }

  // ── Color management ──
  function addColor() {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { hex: '#000000', name: '' }],
    }))
  }

  function removeColor(index: number) {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }))
  }

  function updateColor(index: number, field: 'hex' | 'name', value: string) {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }))
  }

  // ── Unique categories from existing products ──
  const existingCategories = Array.from(
    new Set(products.map((p) => p.category))
  )

  const showForm = isCreating || editingProduct !== null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold tracking-tight text-black">
              Product Manager
            </h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-black/85 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Feedback messages */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{success}</span>
            <button onClick={() => setSuccess('')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Form Modal ── */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-black">
                  {isCreating
                    ? 'Add New Product'
                    : `Edit ${editingProduct?.name}`}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. TARIAN"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                  />
                </div>

                {/* Category + Price row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      list="category-suggestions"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          category: e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, '-'),
                        }))
                      }
                      placeholder="e.g. sofas, tables"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    />
                    <datalist id="category-suggestions">
                      {existingCategories.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                    <p className="text-xs text-gray-400 mt-1">
                      Type an existing category or create a new one
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.price || ''}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          price: Number(e.target.value),
                        }))
                      }
                      placeholder="200"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, image: e.target.value }))
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                  />
                  {formData.image && (
                    <div className="mt-2 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).style.display =
                            'none')
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Product description..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors resize-none"
                  />
                </div>

                {/* Colors */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Colors
                    </label>
                    <button
                      type="button"
                      onClick={addColor}
                      className="text-xs text-black hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add color
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.colors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color.hex}
                          onChange={(e) =>
                            updateColor(i, 'hex', e.target.value)
                          }
                          className="w-10 h-10 rounded border border-gray-300 cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={color.name}
                          onChange={(e) =>
                            updateColor(i, 'name', e.target.value)
                          }
                          placeholder="Color name"
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-colors"
                        />
                        {formData.colors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColor(i)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Is New toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, isNew: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-gray-300 accent-black"
                  />
                  <span className="text-sm text-gray-700">
                    Mark as &quot;New&quot; product
                  </span>
                </label>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-black text-white text-sm font-medium py-3 rounded-lg hover:bg-black/85 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isCreating ? 'Create Product' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Product Table ── */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg mb-2">No products yet</p>
            <p className="text-sm">
              Click &quot;Add Product&quot; to create your first product.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-4 py-3 font-medium text-gray-500 w-16">
                      Image
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">
                      Price
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">
                      Colors
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500 w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-black tracking-wide">
                          {product.name}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        ₹{product.price.toLocaleString('en-IN')}.00
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {product.colors.map((c) => (
                            <span
                              key={c.hex}
                              title={c.name}
                              className="w-5 h-5 rounded-sm border border-gray-200 inline-block"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {product.isNew ? (
                          <span className="inline-block bg-[#d4f000] text-black text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            NEW
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-2 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-500">
              {products.length} product{products.length !== 1 ? 's' : ''} across{' '}
              {existingCategories.length} categor
              {existingCategories.length !== 1 ? 'ies' : 'y'}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
