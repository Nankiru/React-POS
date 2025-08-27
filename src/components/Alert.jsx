    // Alert.jsx (continued)
    const Alert = ({ message, type = 'info', onClose }) => {
      let bgColor = 'bg-blue-100';
      let textColor = 'text-blue-800';
      let borderColor = 'border-blue-500';

      switch (type) {
        case 'success':
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
          borderColor = 'border-green-500';
          break;
        case 'warning':
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
          borderColor = 'border-yellow-500';
          break;
        case 'danger':
          bgColor = 'bg-red-100';
          textColor = 'text-red-800';
          borderColor = 'border-red-500';
          break;
        default:
          // info (default)
          break;
      }
      <div className={`${bgColor} ${textColor} border-l-4 ${borderColor} p-4 rounded-md flex justify-between items-center`}>
          <p>{message}</p>
          {onClose && (
            <button onClick={onClose} className="ml-4 text-gray-600 hover:text-gray-800">
              &times;
            </button>
          )}
        </div>
    }
    
    export default Alert