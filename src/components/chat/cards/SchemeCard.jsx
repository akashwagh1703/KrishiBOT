const SchemeCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 animate-slide-up">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <i className="bx bx-building text-white text-xl"></i>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">{data.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{data.shortDescription}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-start space-x-2">
          <i className="bx bx-dollar text-green-500 mt-0.5"></i>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Benefits: </span>
            <span className="text-gray-900 dark:text-white font-medium">{data.benefits}</span>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <i className="bx bx-check-circle text-blue-500 mt-0.5"></i>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Eligibility: </span>
            <span className="text-gray-900 dark:text-white">{data.eligibility}</span>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <i className="bx bx-calendar text-orange-500 mt-0.5"></i>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Deadline: </span>
            <span className="text-gray-900 dark:text-white">{data.deadline}</span>
          </div>
        </div>
      </div>
      
      <a
        href={data.applicationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:scale-105 transition-transform"
      >
        <i className="bx bx-link-external"></i>
        <span>Apply Online</span>
      </a>
    </div>
  );
};

export default SchemeCard;
