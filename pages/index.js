import { Layout, Nav as Section, Button, Card } from "components";
import Image from "next/image";
import { getActivity, createActivity } from "api/todo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'

const SectionActivity = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 235px);
  gap: 15px;
  justify-content: center;
`

export default function Home() {
  const email = 'disaada@gmail.com'
  const queryClient = useQueryClient()
  const { data, isError } = useQuery(['activity-group'], () => getActivity(email))

  const { mutate } = useMutation(createActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activity-group'])
    },
  })

  console.log(data?.data?.data.length)

  return (
    <Layout>
      <Section>
        <div data-cy="activity-title">Activity</div>
        <Button onClick={() => mutate({ title: 'New Activity', email })} data-cy="activity-add-button">Tambah</Button>
      </Section>
      <SectionActivity>
        {data?.data?.data?.length > 0 && data?.data?.data?.map((v, idx) => (
          <Card data={v} key={v + idx} />
        ))}
        {(data?.data?.data?.length <= 0) && (
          <Image
            src="/icon/activity-empty-state.svg"
            width={300}
            height={300}
            layout="responsive"
            alt=""
            style={{ cursor: 'pointer' }}
            onClick={() => mutate({ title: 'New Activity', email })}
            data-cy="activity-empty-state"
          />
        )}
      </SectionActivity>
    </Layout>
  );
}
