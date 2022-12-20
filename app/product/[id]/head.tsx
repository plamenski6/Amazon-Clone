import DefaultTags from "../../../components/DefaultTags";

const Head = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <DefaultTags
                title={`Amazon Clone. Product ${params.id}`}
                description={`Product ${params.id} description`}
                page={`product-${params.id}`}
            />
        </>
    );
};

export default Head;
