import { AdminLayout } from "../../components/layouts";
import { RiProductHuntLine } from "react-icons/Ri";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useSWR from "swr";
import { IProduct } from "../../interfaces";

const columnDefs = [
  {
    headerName: "Image",
    field: "img",
    cellRenderer: (props: any) => {
      console.log(props);
      return (
        <a
          href={`/product/${props.data.slug}`}
          target="_blank"
          rel="noreferrer"
        >
          <img alt={props.data.title} src={`/products/${props.data.img}`} />
        </a>
      );
    },
  },
  { headerName: "Title", field: "title", width: 200 },
  { headerName: "Gender", field: "gender" },
  { headerName: "Type", field: "type", width: 100 },
  { headerName: "Stock", field: "inStock" },
  { headerName: "Price", field: "price" },
  { headerName: "Size", field: "sizes" },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");

  if (!data && !error) return <></>;

  const rowData = data!.map((product) => ({
    id: product._id,
    slug: product.slug,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(", "),
  }));
  return (
    <AdminLayout
      title="Products"
      subtitle="Products Management"
      icon={<RiProductHuntLine />}
    >
      <div
        style={{
          width: 1400,
          height: 800,
        }}
        className="mx-auto ag-theme-alpine"
      >
        <AgGridReact
          rowHeight={150}
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;
