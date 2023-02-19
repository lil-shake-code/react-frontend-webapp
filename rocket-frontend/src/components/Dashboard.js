import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";

const planName = [
  "Free",
  "Vector⚡",
  "Momentum💡",
  "Spacetime⭐✨",
  "Escape Velocity🚀",
];
function ButtonWithLink() {
  const buttonStyle = {
    backgroundColor: "#104b7f",
    color: "#fff",
    fontSize: "20px",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "25px",
    transition: "all 0.3s ease-in-out",
  };

  const buttonHoverStyle = {
    backgroundColor: "#f67280",
    boxShadow: "0px 0px 15px 3px rgba(0, 0, 0, 0.2)",
  };

  return (
    <a
      href="https://billing.stripe.com/p/login/28obM9dsldhN0wgcMM"
      style={buttonStyle}
      onMouseOver={() => {
        Object.assign(buttonStyle, buttonHoverStyle);
      }}
      target="_blank"
    >
      Your Billing Portal / Edit Plan
    </a>
  );
}
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { duration: 1 } },
// };

// const itemVariants = {
//   nphidden: { x: -100 },
//   visible: { x: 0, transition: { duration: 0.5 } },
// };
var d = { a: 1 };
function Dashboard() {
  const [data, setData] = useState(null);
  const { uid } = useParams();
  const uuid = uid;
  useEffect(() => {
    const ref = firebase.database().ref("users/" + uid);
    //console.log("trying to read from firebase database");
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      delete value["linode"];
      delete value["stm"];
      delete value["stripe"];
      delete value["emailVerified"];
      value["why does this look so bad"] = "I'm working on it :( ";

      setData(value);
      d = value;
      //console.log(JSON.stringify(value));
    });
  }, []);

  //   return (
  //     <div>
  //       <p>
  //         {"You have subscribed to plan : " +
  //           { data }.plan +
  //           " which allows " +
  //           { data }.maxClients +
  //           " maximum clients."}
  //       </p>
  //     </div>
  //   );

  //   return (
  //     <div>
  //       {data ? (
  //         <div>
  //           <h1>Here is the data for UUID {uuid}:</h1>
  //           <pre>{JSON.stringify(data, null, 2)}</pre>
  //         </div>
  //       ) : (
  //         <p>Loading...</p>
  //       )}
  //     </div>
  //   );

  return (
    <>
      <h1> --Your Dashboard🚀--</h1>
      <br></br>
      <h4>- Copy the following key in GMS2</h4>
      <h2>- Secret key : {uid}</h2>
      <br></br>{" "}
      <div>
        {" "}
        <ReactJson src={data} theme="sola" />
      </div>
      <br></br> <h2>- Your Plan : {planName[d.plan]}</h2>
      <h2>- Max CCU🧑‍🤝‍🧑 Allowed : {d.maxClients}</h2>
      <h4>- Plan changes can take upto 10mins to reflect.</h4>
      <br></br>
      <div>
        <ButtonWithLink />
      </div>
    </>
  );

  //   return (
  //     <motion.div variants={containerVariants} initial="hidden" animate="visible">
  //       {Object.entries(d).map(([key, value]) => (
  //         <motion.div key={key} variants={itemVariants}>
  //           <h2>{key}</h2>
  //           <p>{value}</p>
  //         </motion.div>
  //       ))}
  //     </motion.div>
  //   );
}

export default Dashboard;
