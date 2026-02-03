export async function getServerSideProps({ params, req }) {
  const baseUrl = req.headers.host.startsWith("localhost")
    ? "http://" + req.headers.host
    : "https://" + req.headers.host;

  const res = await fetch(`${baseUrl}/api/pastes/${params.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();

  return {
    props: { text: data.text }
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