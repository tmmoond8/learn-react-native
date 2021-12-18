import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useLogContext} from '../contexts/LogContext';
import {useSearchContext} from '../contexts/SearchContext';
import FeedList from '../components/FeedList';
import EmptySearchResult from '../components/EmptySearchResult';

export default function SearchScreen() {
  const {keyword} = useSearchContext();
  const {logs} = useLogContext();
  const filtered = React.useMemo(() => {
    return keyword === ''
      ? []
      : logs.filter(log =>
          [log.title, log.body].some(text => text.includes(keyword)),
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <View style={styles.block}>
      {filtered.length > 0 && <FeedList logs={filtered} />}
      {filtered.length === 0 && (
        <EmptySearchResult
          type={keyword === '' ? 'EMPTY_KEYWORD' : 'NOT_FOUND'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});
