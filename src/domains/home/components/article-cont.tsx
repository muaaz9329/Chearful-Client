import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { TArticle } from '../../consumer-contents/domains/articles/types';
import ArticleCard from '../../consumer-contents/domains/articles/components/article-card';
import { Loader } from '@app/components';
import ContentService from '../../consumer-contents/service';

const ArticleCont = () => {
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
