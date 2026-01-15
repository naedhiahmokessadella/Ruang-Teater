import { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://69660b04f6de16bde44bf3c3.mockapi.io/categories";

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
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading };
}
