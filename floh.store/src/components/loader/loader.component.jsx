

 export  function LoaderComponent() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 " style={{zIndex: "100" }}>
      <div className="animate-spin w-10 h-10 border-t-4 border-green-500 border-solid rounded-full"></div>
    </div>
  );
}


