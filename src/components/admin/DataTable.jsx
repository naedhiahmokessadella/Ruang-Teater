import { Edit2, Trash2, Eye } from "lucide-react";

export default function Datatable({ data, columns, onEdit, onDelete, onView }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold mb-3">Data Event</h3>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="border p-2 text-left">
                {c.header}
              </th>
            ))}
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((c, i) => (
                <td key={i} className="border p-2">
                  {item[c.field]}
                </td>
              ))}
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => onView(item)}
                  className="text-blue-600"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(item)}
                  className="text-yellow-600"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(item)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}