import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "./../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";

const Form = ({ user }) => {
  // yükleniyorun state'ni yap
  const [isLoading, setIsLoading] = useState(false);
  // tweetler kolleyksiyonun referansını al
  const tweetsCol = collection(db, "tweets");

  // dosya resimse resmi storage yükle ve
  //resmin urlini fonsksiyonun çağrıldığı yere döndürür
  const uploadImage = async (file) => {
    // 1) dosya resim değilse fonksiyonu durdur
    if (!file || (!file && !file.type.startsWith("image"))) {
      return null;
    }

    // 2) dosyanın yükleneceği konumun referansını alma
    const fileRef = ref(storage, v4() + file.name);
    // 3) referansını oluşturduğumu konuma dosyayı yükle
    await uploadBytes(fileRef, file);

    // 4) yüklenen dosyanın url'ine eriş ve döndür
    return await getDownloadURL(fileRef);
  };

  //form gönderildiğinde
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) inputlardaki verilere eriş
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // 2) yazı ve resim içeriği yoksa uyarı ver
    if (!textContent && !imageContent) {
      return toast.info("Lütfen içerik giriniz");
    }
    // yüklenme State'ini trueya çek
    setIsLoading(true);
    try {
      // 3) resmi storage'a yükle
      const url = await uploadImage(imageContent);

      // 4) yeni tweet dokümanını kolleksiyona ekle
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      console.log(err);
    }

    // yüklenme state'ini false çek
    setIsLoading(false);

    // 5) formu temizle
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt={user?.displayName}
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-4 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="image"
          >
            <BsCardImage />
          </label>

          <input className="hidden" id="image" type="file" />

          <button
            type="submit"
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
          >
            {isLoading ? (
              <>
                <Loader styles={`!text-white`} />
                <span className="text-[10px] ms-2">Yükleniyor..</span>
              </>
            ) : (
              "Tweetle"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
