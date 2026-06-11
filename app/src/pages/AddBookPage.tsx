// src/pages/AddBookPage.tsx
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlassCard } from '@/components/ui/custom/GlassCard';
import { NeonButton } from '@/components/ui/custom/NeonButton';
import { NeonInput } from '@/components/ui/custom/NeonInput';
import { useBooks } from '@/hooks/useBooks';

export default function AddBookPage() {
    const navigate = useNavigate();
    const { createBook, isLoading: isSubmitting } = useBooks();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        totalPages: '',
        genre: '',
        status: 'want_to_read' as 'want_to_read' | 'reading' | 'completed',
        targetDays: '30',
        customDays: '',
    });

    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setCoverPreview(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.title.trim() || !formData.author.trim()) {
            setError('Title and Author are required');
            return;
        }

        const targetDays = formData.targetDays === 'custom'
            ? parseInt(formData.customDays) || 30
            : parseInt(formData.targetDays);

        const bookData = {
            title: formData.title.trim(),
            author: formData.author.trim(),
            totalPages: parseInt(formData.totalPages) || 0,
            currentPage: 0,
            genre: formData.genre || null,
            status: formData.status,
            targetCompletionDays: targetDays,
        };

        try {
            await createBook(bookData);
            navigate('/books', {
                state: { success: 'Book added successfully!' }
            });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add book. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/books')}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={28} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Add New Book</h1>
                        <p className="text-white/60">Build your personal quote library</p>
                    </div>
                </div>

                <GlassCard className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Cover Upload */}
                            <div className="lg:col-span-5">
                                <label className="block text-white/70 mb-3 text-sm font-medium">Book Cover (Optional)</label>
                                <div
                                    className="aspect-[4/3] border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center hover:border-cyan-400/50 transition-all cursor-pointer overflow-hidden bg-black/30"
                                    onClick={() => document.getElementById('coverInput')?.click()}
                                >
                                    {coverPreview ? (
                                        <img
                                            src={coverPreview}
                                            alt="Cover Preview"
                                            className="w-full h-full object-cover rounded-3xl"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="w-16 h-16 text-white/40 mx-auto mb-4" />
                                            <p className="text-white/70">Click to upload cover</p>
                                            <p className="text-white/40 text-sm mt-1">PNG or JPG recommended</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="coverInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleCoverChange}
                                />
                            </div>

                            {/* Book Details */}
                            <div className="lg:col-span-7 space-y-6">
                                <NeonInput
                                    label="Book Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    placeholder="Atomic Habits"
                                />

                                <NeonInput
                                    label="Author Name"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    placeholder="James Clear"
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <NeonInput
                                        label="Total Pages"
                                        name="totalPages"
                                        type="number"
                                        value={formData.totalPages}
                                        onChange={handleChange}
                                        placeholder="320"
                                    />

                                    <div>
                                        <label className="block text-white/70 text-sm mb-2">Genre</label>
                                        <select
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-cyan-400 focus:outline-none"
                                        >
                                            <option value="">Select Genre</option>
                                            <option value="Self-Help">Self-Help</option>
                                            <option value="Fiction">Fiction</option>
                                            <option value="Business">Business</option>
                                            <option value="Philosophy">Philosophy</option>
                                            <option value="Biography">Biography</option>
                                            <option value="Productivity">Productivity</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-2">Reading Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white focus:border-cyan-400 focus:outline-none"
                                    >
                                        <option value="want_to_read">Want to Read</option>
                                        <option value="reading">Currently Reading</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                {/* Target Completion */}
                                <div>
                                    <label className="block text-white/70 text-sm mb-3">
                                        How many days do you plan to finish this book?
                                    </label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {['10', '20', '30', '45'].map((d) => (
                                            <button
                                                key={d}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, targetDays: d, customDays: '' }))}
                                                className={`py-3 rounded-2xl text-sm font-medium transition-all ${formData.targetDays === d
                                                        ? 'bg-cyan-500 text-black font-semibold'
                                                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                                    }`}
                                            >
                                                {d} days
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, targetDays: 'custom' }))}
                                            className={`py-3 rounded-2xl text-sm font-medium transition-all ${formData.targetDays === 'custom'
                                                    ? 'bg-cyan-500 text-black'
                                                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                                }`}
                                        >
                                            Custom
                                        </button>
                                    </div>

                                    {formData.targetDays === 'custom' && (
                                        <NeonInput
                                            type="number"
                                            name="customDays"
                                            value={formData.customDays}
                                            onChange={handleChange}
                                            placeholder="Enter number of days"
                                            className="mt-4"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-center">{error}</p>}

                        <NeonButton
                            type="submit"
                            variant="primary"
                            className="w-full py-4 text-lg font-semibold"
                            disabled={isSubmitting || !formData.title.trim() || !formData.author.trim()}
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {isSubmitting ? 'Adding Book...' : 'Add Book to My Library'}
                        </NeonButton>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
}