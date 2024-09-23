// import React, { useEffect, useState } from "react";
// import '../styles/categories.css'; // Make sure to style the component
// import ButtonCategoriesAnime from "./ButtonCategories";

// interface Category {
//     mal_id: number;
//     name: string;
// }

// interface CategoriesAnimeProps {
//     onCategorySelect: (categoryId: number) => void;
// }

// const CategoriesAnime: React.FC<CategoriesAnimeProps> = ({ onCategorySelect }) => {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch("https://api.jikan.moe/v4/genres/anime?limit=10");
//                 if (!response.ok) throw new Error("Failed to fetch categories");
//                 const { data } = await response.json();

//                 console.log(data);
                
//                 // Map categories
//                 const categoryList: Category[] = data.map((category: any) => ({
//                     mal_id: category.mal_id,
//                     name: category.name,
//                 }));

//                 setCategories(categoryList);
//             } catch (error) {
//                 setError((error as Error).message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCategories();
//     }, []);

//     if (loading) return <p>Loading categories...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="categories-container">
//             <div className="categories">
//              <ButtonCategoriesAnime text="Categories" />
//             </div>
           
//             <ul className="categories-list">
//                 {categories.map((category) => (
//                     <li 
//                         key={category.mal_id} 
//                         onClick={() => onCategorySelect(category.mal_id)}
//                         className="category-item"
//                     >
//                         <span>{category.name}</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CategoriesAnime;
