import useFetchQuery from "../hooks/shared/useFetch";

const useCollectionProducts = () =>{
     const {data, isSuccess, isLoading, refetch} = useFetchQuery("/products/all-product")

     return {products: data || [], isSuccess, isLoading, refetch};
};

export default useCollectionProducts;

 
  

