import { Layout, Nav as Section, Button, Card } from "components";
import Image from "next/image";
import { getActivity, createActivity } from "api/todo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function Home() {
  const email = 'disaada@gmail.com'
  const queryClient = useQueryClient()
  const { data, isError } = useQuery(['activity'], () => getActivity(email))

  const { mutate } = useMutation(createActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activity-group'])
    },
  })

  return (
    <Layout>
      <Section>
        <div>Activity</div>
        <Button>tambah</Button>
      </Section>
      <section>
        { data?.data?.data?.length > 0 && data?.data?.data?.map((v, idx) => (
          <Card data={v} key={v+idx} />
        ))}
        {(data?.data?.data?.length <= 0) || isError && (
          <Image
            src="/icon/activity-empty-state.svg"
            width={300}
            height={300}
            layout="responsive"
            alt=""
            style={{ maxWidth: '500px', cursor: 'pointer' }}
            onClick={() => mutate({ title: 'New Activity', email })}
          />
        )}
      </section>
    </Layout>
  );
}
