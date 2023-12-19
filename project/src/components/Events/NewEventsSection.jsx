import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  // queryFn은 프로미스를 반환하는 함수여야 한다.
  // queryKey는 쿼리를 식별하는 문자열이다. *필수
  // queryKey는 기본적으로 배열이다.
  // queryKey가 변경되면 useQuery는 새로운 데이터를 가져온다.
  // staleTime은 쿼리가 만료되기 전까지 캐시된 데이터를 사용한다. 기본값은 0, 단위는 밀리초
  // gcTime은 쿼리가 만료된 후에 캐시에서 제거된다. 기본값은 5분, 단위는 밀리초

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    // staleTime: 5000,
    // gcTime: 1000,
  });
  console.log(data);
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Fetch failed event list'}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
