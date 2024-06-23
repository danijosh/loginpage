// import { useForm } from "react-hook-form";
// import style from "./project1.module.css";
// const Log_in = () => {

//     const {register,handleSubmit,formState:{errors}}=useForm()
//     console.log(useForm);
//     const omit=(data)=>{
//         console.log(data.email,data.pwd) 
//     }
//     console.log(errors);
// return (
//     <div>
//       <section className={style.main_container}>
//         <h1>Log In</h1>
//         {/* <article className={style.container}> */}
//           <form onSubmit={handleSubmit(omit)} className={style.form}>
//             <span>Email</span>
//             <input type="email" name="email" id={style.email} {...register('email',{required:"ⓘemail can't be empty" })} />
//             <p id={style.Eerror}>{errors.email?.message}</p>
//             <br />
//             <span>Password</span>
//             <input type="password" name="pwd" id={style.pass} {...register('pwd',{required:"ⓘpassword can't be empty"} )}/>
//             <p id={style.Perror}>{errors.pwd?.message}</p>
//             <br />
//             <button id={style.submit}>Submit</button>
//           </form>
//         {/* </article> */}
//       </section>
//     </div>
//   );
// };
// export default Log_in;




