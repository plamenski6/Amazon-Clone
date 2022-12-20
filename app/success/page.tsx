import { collection, getDocs, orderBy, query as firestoreQuery } from "firebase/firestore";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import SuccessClientArea from "./SuccessClientArea";
import { redirect } from "next/navigation";
import { db } from "../../firebase";

const Success = async () => {
    const session = await unstable_getServerSession(authOptions);

    if (!session) {
        redirect("/");
    } else {
        const usersColRef = collection(db, "users", session?.user?.email as string, "orders");
        const q = firestoreQuery(usersColRef, orderBy("timestamp", "desc"));
        const userOrders = await getDocs(q);
        const orderTimeMiliseconds = userOrders.docs[0].data().timestamp.seconds * 1000;
        const currentTimeMiliseconds = Math.floor(new Date().getTime());

        if (
            /*query.session_id !== userOrders.docs[0].id ||*/ currentTimeMiliseconds >
            orderTimeMiliseconds + 60 * 1000
        ) {
            redirect("/");
        }
    }

    return <SuccessClientArea />;
};

export default Success;
