const SkeletonCard = () => {
    return (
      <article
        className="relative bg-white p-6 rounded-lg shadow-md text-left shimmer-wrapper result-card"
        aria-hidden="true"
        role="presentation"
      >
        <header className="mb-3">
          {/* Target Company Name */}
          <h2 className="h-5 w-3/4 bg-gray-300 rounded mb-2"></h2>
  
          {/* Acquirer Line */}
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-1"></div>
  
          {/* Deal Status */}
          <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
        </header>
  
        <section className="space-y-2 mb-4">
            {/* 12 Detail Rows */}
            <div className="h-3 w-full bg-gray-100 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
            <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
            <div className="h-3 w-4/5 bg-gray-100 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
            <div className="h-3 w-3/5 bg-gray-100 rounded"></div>
            <div className="h-3 w-4/6 bg-gray-100 rounded"></div>
            <div className="h-3 w-2/4 bg-gray-100 rounded"></div>
            <div className="h-3 w-2/3 bg-gray-100 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-100 rounded"></div>
        </section>

  
        {/* Description / Notes */}
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
  
        <footer>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        </footer>
  
        <div className="shimmer"></div>
      </article>
    );
  };
  
  export default SkeletonCard;
  