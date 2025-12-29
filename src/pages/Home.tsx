import useCategories from "@hooks/useCategories";
import { Category } from "@components/eCommerce";
import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { TCategory } from "@types";
import {MainSection }from '@components/common';
const Home = () => {

  const { loading, error, records } = useCategories();


  return  <>
  <Loading status={loading} error={error} type="category">
  <MainSection />
  <Heading title="categories"  />
    <GridList<TCategory>
      emptyMessage="There are no categories"
      records={records}
      renderItem={(record) => <Category {...record} />}
    />
  </Loading>
</>
};

export default Home;
