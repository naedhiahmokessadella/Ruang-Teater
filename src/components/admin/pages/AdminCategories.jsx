import useCategoriesApi from "../../../hooks/useCategoriesApi";
import { Trash2 } from "lucide-react";

export default function AdminCategories() {
  const { categories, loading } = useCategoriesApi();

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Event Categories
      </h2>

      {categories.length === 0 && (
        <p className="text-gray-500">No categories found</p>
      )}

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <span className="font-medium">{cat.name}</span>

            <button className="text-red-600 hover:bg-red-50 p-2 rounded">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
