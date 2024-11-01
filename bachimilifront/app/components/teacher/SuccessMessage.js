const SuccessMessage = ({ message }) => (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-4 px-8 rounded-lg shadow-lg z-50 text-lg font-semibold max-w-sm text-center">
      {message || "Actualización Exitosa"}
    </div>
  );
  
  export default SuccessMessage;
  