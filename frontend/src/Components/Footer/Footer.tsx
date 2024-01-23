import React from "react";
const Footer:React.FC =()=> {
  return (
    <footer className="w-full flex flex-col p-4 bg-gray-900 text-gray-100 justify-center items-center">
      <div>
        <p>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        {/* Add additional footer content here */}
      </div>
    </footer>
  );
}

export default  Footer