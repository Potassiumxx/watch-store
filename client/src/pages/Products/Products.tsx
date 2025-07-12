import { useUIStore } from "../../store/uiStore";

export default function Products() {
  const navbarHeight = useUIStore((state) => state.navbarHeight);

  return (
    <div className={`text-white`} style={{ paddingTop: `${navbarHeight ?? 121}px` }}>
      <h1 className="text-center">Products</h1>
    </div>
  );
}
