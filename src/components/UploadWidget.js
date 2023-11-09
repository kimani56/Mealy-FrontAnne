// import { useEffect, useRef } from "react";

// const UploadWidget = () => {
//     const cloudinaryRef = useRef();
//     const widgetRef = useRef();

//     useEffect(()=> {
//         cloudinaryRef.current = window.cloudinary;
//         widgetRef.current = cloudinaryRef.current.createUploadWidget({
//             cloudName: 'dizhfsddx',
//             uploadPreset: 'giftkimani'
//         }, function(error, result){
//             console.log(result);

//         } );

//     }, [])

//     return(
//         <button onClick={() => widgetRef.current.open()}></button>
//     )

// }

// export default UploadWidget;