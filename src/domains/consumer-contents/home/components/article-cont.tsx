import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArticleCard } from '@app/common/components/Cards';
import ContentService from '@app/services/content-services';
import Loader from '@app/common/components/loader';

const ArticleCont = ({ setLoading }: { setLoading: any }) => {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    ContentService.getArticles({
      onSuccess: (res) => {
        setArticles(res.data.articles);
        setloading(false);
      },
      onFailure: (err) => {
        console.log(err);
      },
      data: [
        {
          key: 'page',
          value: 1,
        },
        {
          key: 'limit',
          value: 5,
        },
      ],
    });
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <ArticleCard Data={item} style={'Home Design'} />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default ArticleCont;

const styles = StyleSheet.create({});
