import { Layout, Nav as Section, Button, Card } from "components";
import Image from "next/image";
import { getActivity, createActivity } from "api/todo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const SectionActivity = styled.section`
  img {
    cursor: pointer;
  }

  .section-empty-state {
    text-align: center;
  }

  .section-activity-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 235px);
    gap: 15px;
    justify-content: center;
  }
`

export default function Home() {
  const email = 'disaada@gmail.com'
  const queryClient = useQueryClient()
  const { data } = useQuery(['activity-group'], () => getActivity(email), { refetchOnWindowFocus: false })

  const { mutate } = useMutation(createActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activity-group'])
    },
  })

  return (
    <Layout>
      <Section>
        <div data-cy="activity-title" className="nav-title">Activity</div>
        <Button
          onClick={() => mutate({ title: 'New Activity', email })}
          data-cy="activity-add-button"
          primary
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10  }} />
          Tambah
        </Button>
      </Section>
      <SectionActivity>
        <div className="section-activity-list">
          {data?.data?.data?.length > 0 && data?.data?.data?.map((v, idx) => (
            <Card data={v} key={v + idx} />
          ))}
        </div>
        <div className="section-empty-state">
          {(data?.data?.data?.length <= 0) && (
            <Image
              src="/icon/activity-empty-state.svg"
              width={500}
              height={500}
              layout="intrinsic"
              alt=""
              onClick={() => mutate({ title: 'New Activity', email })}
              data-cy="activity-empty-state"
            />
          )}
        </div>
      </SectionActivity>
    </Layout>
  );
}
