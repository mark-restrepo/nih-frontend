import { useState } from 'react';
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

async function queryFetch(id) {
  const request = new Request("http://localhost:7070/fetch/" + id);
  let data;
  do {
    const response = await limiter.schedule(() => fetch(request));
    data = await response.json();
  } while (data.status != 'completed')
  return data;
}


function SearchForm() {
  const [formState, setFormState] = useState("input");
  const [recordState, setRecordState] = useState(0);
  const [resultState, setResultState] = useState([]);

  function Input() {
    return <input type="text" id="term" name="term"/>;
  }

  function Loader() {
    return (
      <>
        <div>Request succesful, {recordState} records found.</div>
        <div>Please be patient, your content is loading...</div>
      </>
  );
  }

  function SubmitButton() {
    return <button type="submit" className="submitButton">Submit</button>;
  }

  async function handleSubmit() {
    setFormState("await");
    const searchTerm = document.getElementById("term").value;
    const options = {
      method: "GET",
      mode: "cors"
    };
    const request = new Request("http://localhost:7070/search/" + searchTerm, options);
    const response = await fetch(request);
    let json = await response.json();
    setRecordState(json.records)
    const searchResults = await queryFetch(json.id);
    setResultState(searchResults.result.pmids)
    setFormState("display");
  }

  function Content() {
    function ResetButton() {
      function handleClick() {
        setFormState("input");
      }
      return <button onClick={handleClick} type="button" className="resetButton">Clear results and search for something new</button>;
    }

    function RenderResults(){
        return (
          <>
           {resultState.map(result => <div className="article"><a href={"https://pubmed.ncbi.nlm.nih.gov/" + result} target="_blank" key={result}> {result} </a></div>)}
          </>
        );
    }

    return (
      <>
        <div className="sticky">
          <ResetButton />
        </div>
        <div>
          <RenderResults />
        </div>
      </>
    )
  }


  if (formState === "await") {
    return <Loader />;
  } else if (formState === "input") {
    return (
        <form className="searchForm" onSubmit={handleSubmit}>
          <Input />
          <SubmitButton />
        </form>
    );
  } else if (formState === "display"){
    return <Content />;
  }
}

export default function Page() {
    return (
      <>
        <SearchForm />
      </>
    );
}
