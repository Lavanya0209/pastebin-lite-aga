export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/pastes?id=${params.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const text = await res.text();

  return { props: { text } };
}

export default function Paste({ text }) {
  return (
    <pre style={{ padding: 20 }}>{text}</pre>
  );
}