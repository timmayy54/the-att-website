async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;
}

export default function Home() {
  return (
    <div>
      <h1>Hello from the Index pages</h1>
    </div>

  );
}
