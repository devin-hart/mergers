const SkeletonCard = () => {
    return (
      <article
        className="relative bg-white p-6 rounded-lg shadow-md text-left shimmer-wrapper result-card"
        aria-hidden="true"
        role="presentation"
      >
        <header>
          <h2 className="h-5 w-3/4 bg-gray-300 rounded mb-2"></h2>
        </header>
  
        <section>
          <p className="h-4 w-2/3 bg-gray-200 rounded mb-1"></p>
          <p className="h-4 w-1/2 bg-gray-200 rounded mb-1"></p>
          <p className="h-4 w-3/4 bg-gray-200 rounded mb-2"></p>
        </section>
  
        <footer>
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        </footer>
  
        <div className="shimmer"></div>
      </article>
    );
  };
  
  export default SkeletonCard;
  