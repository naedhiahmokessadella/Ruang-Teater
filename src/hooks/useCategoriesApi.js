import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://695e0f242556fd22f6772c21.mockapi.io/categories";

export default function useCategoriesApi() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (error) {
      console.error("Gagal fetch categories:", error);
      setCategories([]); // fallback biar app tetap jalan
    } finally {
      setLoading(false); // 🔥 INI KUNCI
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading };
}
