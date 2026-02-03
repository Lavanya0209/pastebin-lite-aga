export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paste?id=${id}`);
  const data = await res.json();

  if (!res.ok) {
    return { notFound: true };
  }

  return {
    props: {
      text: data.text,
    },
  };
}

export default function Paste({ text }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Paste</h1>
      <pre>{text}</pre>
    </div>
  );
}