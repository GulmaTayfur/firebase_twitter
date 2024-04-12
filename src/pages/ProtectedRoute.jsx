import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  // kullanıcının yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    // onAuthstateChanged > kullanıcı oturumun değişimini izler (açma kapama)
    const unsub = onAuthStateChanged(auth, (user) => {
      // eğer oturum açtıysa yetkiyi true'ya kapattıysa false'a çekiyoruz
      setIsAuth(user ? true : false);
    });
    return () => unsub();
  }, []);

  // eğer yetkisi yoksa ekrana bas
  if (isAuth === false) {
    // useNavigate kullanınca bileşen tam yüklenmeden yönlendirme yapmamızdan kaynaklı react uyarı veriyordu bize useNavigate bileşeni yerine Navigate bileşeni kullandık. Bunu kullanınca browser router bileşenin yüklenme işlemini tamamlamış gibi algılıyor ve to prppu olarak tanımladığımız sayfaya yönlendiriyor
    return <Navigate to={"/"} />;
  }
  // Kapsayıcı bir route'da alt route'u çağırma
  return <Outlet />;
};

export default ProtectedRoute;
