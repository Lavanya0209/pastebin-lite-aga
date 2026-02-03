export async function getServerSideProps({ params, req }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;

  const res = await fetch(
    `${protocol}://${host}/api/paste?id=${params.id}`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();

  return {
    props: {
      text: data.text,
    },
  };
}

export default function Paste({ text }) {
  return (
    <pre style={{ padding: 30, whiteSpace: "pre-wrap" }}>
      {text}
    </pre>
  );
}