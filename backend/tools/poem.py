"""
Poem Tool - Se ejecuta en el backend
El resultado se renderiza en el frontend via AG-UI
"""

from typing import Annotated

def generate_poem(
        topic: Annotated[str, "The topic or theme of the poem"],
        poem: Annotated[str, "The generated poem as a string"],
        style: Annotated[str, "The style of the poem, e.g., haiku, sonnet, free verse"]
) -> dict:
    """
      Return a structured poem for frontend rendering.
      The LLM agent (Gemini 2.5 Flash) generates the poem and passes it here.
      """

    return {
        "topic": topic,
        "style": style,
        "poem": poem,
    }


