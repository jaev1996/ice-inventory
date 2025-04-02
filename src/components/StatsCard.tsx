interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
  }
  
  const StatsCard = ({ title, value, icon }: StatsCardProps) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <span className="text-xl">{icon}</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatsCard;