
export default function Page({ params }: { params: { email: string } }) {
    return <div>My Post: {params.email}</div>
}