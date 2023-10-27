import React, { useEffect, useState } from 'react';
import ContentService, { ContentServiceTypes } from '../service';
import { Category } from '@app/types';
import { GetRequestParams } from '@app/services/api-service';

const defaultParams = [
  {
    key: 'limit',
    value: 10,
  },
  {
    key: 'page',
    value: 1,
  },
];

/**
 *
 * @param setLoading function to invoke loading screen when data is loading
 * @param serviceName name of the service to call
 * @param dataKeyName name of the key in the response data like soundbites etc
 * @param typeOfCategory type of category to get
 * @returns filtered data , function to set title and function to set tag
 */

const useListing = (
  setLoading: (value: any) => void,
  serviceName: ContentServiceTypes,
  dataKeyName: string,
  typeOfCategory?: 'all' | 'article' | 'soundbite' | 'forum', // for getting categories of specific type
) => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>({
    id: 0,
    slug: 'All',
    title: 'All',
  }); // for filtering the array according to tag selection

  const [data, setData] = useState<any[]>();

  const [searchTitle, setSearchTitle] = useState<string>(''); // for filtering the array according to title search

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 0,
      slug: 'All',
      title: 'All',
    },
  ]);

  const [page, setPage] = useState<number>(1);

  const handleSoundBitesApiCall = (params: GetRequestParams) => {
    setLoading((prev: any) => ({
      ...prev,
      listing: true,
      hidingNextBtn: false,
    })); // for showing loader on listing screen and conditionally hiding load more button
    // @ts-ignore
    ContentService[`${serviceName}`]({
      onSuccess: (res: any) => {
        setData(res.data?.[`${dataKeyName}`]);

        setLoading((prev: any) => ({
          ...prev,
          listing: false,
        }));
        if (res.data?.[`${dataKeyName}`].length < 10) {
          setLoading((prev: any) => ({
            ...prev,
            hidingNextBtn: true,
          }));
        }
      },
      onFailure: (err: any) => {
        console.log(err.error);
      },
      data: params,
    });
  }; // Api call for sound bites listing

  //* Case 1 : When user select some category and want data according to that category

  useEffect(() => {
    const filterTag = () => {
      // ParamData is Considered
      let ParamData: GetRequestParams;
      if (selectedCategory.title === 'All') {
        // if All is selected in Categories then simple call the Api with Default Config , no need for adding category key in api call
        ParamData = [...defaultParams];
        handleSoundBitesApiCall(ParamData);
      } else {
        // as soon other category get selected , Add the Param Category with selected value and ask api for data that falls into that category
        ParamData = [
          {
            key: 'category',
            value: selectedCategory.slug,
          },
          ...defaultParams,
        ];
        handleSoundBitesApiCall(ParamData);
      }
    };
    filterTag(); // filtering the data according to tag selection
  }, [selectedCategory]); // watching :- selectedCategory state for changes

  //* Case 2 : When user search and submits for some title and want data according to that title

  const onSubmitTitleSearch = () => {
    if (searchTitle) {
      // Extra Protection always helps son 😼
      if (selectedCategory.title === 'All') {
        //some more protection 🤭
        let ParamData: GetRequestParams = [
          {
            key: 'search',
            value: searchTitle,
          },
          ...defaultParams,
        ];
        handleSoundBitesApiCall(ParamData);
      } else {
        // if some category is selected and user is also Searching for title
        let ParamData: GetRequestParams = [
          {
            key: 'search',
            value: searchTitle,
          },
          {
            key: 'category',
            value: selectedCategory.slug,
          },
          ...defaultParams,
        ];
        handleSoundBitesApiCall(ParamData);
      }
    }
  }; // filtering the data according to title search

  //* Case 3 : When user opens the screen for the first time

  useEffect(() => {
    setLoading({
      categories: true,
      listing: true,
    });
    ContentService.getCategories({
      onSuccess: (res) => {
        setCategories([
          {
            id: 0,
            slug: 'All',
            title: 'All',
          },
          ...res.data,
        ]);
        setLoading((prev: any) => ({
          ...prev,
          categories: false,
        }));
      },
      onFailure: (err) => {
        console.log('Error in Tag Api call in Hook :', err.error);
      },
      // @ts-ignore
      typeOfCategory: typeOfCategory,
    });
    handleSoundBitesApiCall(defaultParams);
  }, []); // returning all the categories or selected category and listing data

  //* Case 4 : when user cleans the search input

  useEffect(() => {
    if (searchTitle === '') {
      handleSoundBitesApiCall(defaultParams);
    }
  }, [searchTitle]); // watching :- searchTitle state for changes

  //* Case 5 : when user clicks on Load More Button

  const LoadNextBatch = () => {
    let ParamData: GetRequestParams;
    if (selectedCategory.title === 'All') {
      // if All is selected in Categories then simple call the Api with Default Config , no need for adding category key in api call
      ParamData = [
        {
          key: 'page',
          value: (page + 1).toString(),
        },
        {
          key: 'limit',
          value: 10,
        },
      ]; // for loading next batch of and adding it to the existing data
      setLoading((prev: any) => ({
        ...prev,
        nextBatch: true,
      })); // for showing loader on load more button
      // @ts-ignore
      ContentService[`${serviceName}`]({
        onSuccess: (res: any) => {
          setData((prev: any) => [...prev, ...res.data?.[`${dataKeyName}`]]);

          setLoading((prev: any) => ({
            ...prev,
            nextBatch: false,
          })); // for hiding loader  on completion of api call
          if (res.data?.[`${dataKeyName}`].length < 10) {
            setLoading((prev: any) => ({
              ...prev,
              hidingNextBtn: true,
            })); // for hiding load more button when there is no more data to load as each api call returns 10 data
          }
        },
        onFailure: (err: any) => {
          console.log(err.error);
        },
        data: ParamData,
      });
    } else {
      // as soon other category get selected , Add the Param Category with selected value and ask api for data that falls into that category
      ParamData = [
        {
          key: 'category',
          value: selectedCategory.slug,
        },
        {
          key: 'page',
          value: (page + 1).toString(),
        },
        {
          key: 'limit',
          value: 10,
        },
      ];
      // @ts-ignore
      ContentService[`${serviceName}`]({
        onSuccess: (res: any) => {
          setData((prev: any) => [...prev, ...res.data?.[`${dataKeyName}`]]);

          setLoading((prev: any) => ({
            ...prev,
            nextBatch: false,
          }));
          if (res.data?.[`${dataKeyName}`].length < 10) {
            setLoading((prev: any) => ({
              ...prev,
              hidingNextBtn: true,
            }));
          }
        },
        onFailure: (err: any) => {
          console.log(err.error);
        },
        data: ParamData,
      });
    }
    setPage((prev) => prev + 1);
  }; // for loading next batch of and adding it to the existing data

  return {
    setSearchTitle,
    setSelectedCategory,
    data,
    categories,
    onSubmitTitleSearch,
    LoadNextBatch,
  };
};

export default useListing;
