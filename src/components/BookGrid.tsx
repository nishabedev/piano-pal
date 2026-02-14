import { Link } from 'react-router';
import { levels, levelColors, getBooksByLevel } from '../data/catalog';

const typeIcons: Record<string, string> = {
  lesson: '📖',
  performance: '🎵',
  theory: '📝',
  technique: '🎹',
};

const typeLabels: Record<string, string> = {
  lesson: 'Lesson',
  performance: 'Performance',
  theory: 'Theory',
  technique: 'Technique',
};

export default function BookGrid() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white dark-text tracking-tight">
          Piano Adventures
        </h1>
        <p className="text-sm text-slate-400 dark-text-secondary mt-1">
          Choose a book to start practicing
        </p>
      </div>

      {levels.map(level => {
        const booksForLevel = getBooksByLevel(level);
        const colors = levelColors[level];

        return (
          <section key={level} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${colors.gradient}`} />
              <h2 className={`text-sm font-bold uppercase tracking-wider ${colors.text} ${colors.textClass}`}>
                {level}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {booksForLevel.map(book => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className={`group relative ${colors.bg} ${colors.bgHover} border ${colors.border} rounded-2xl p-4 text-center transition-all duration-200 active:scale-[0.97]`}
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {typeIcons[book.type]}
                  </div>
                  <div className="text-white dark-text font-bold text-xs leading-tight">
                    {typeLabels[book.type]}
                  </div>
                  <div className="text-slate-400 dark-text-muted text-[10px] font-semibold mt-1">
                    {book.songs.length} songs
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
