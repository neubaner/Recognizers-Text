﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
//     
//     Generation parameters:
//     - DataFilename: Patterns\French\French-Choice.yaml
//     - Language: French
//     - ClassName: ChoiceDefinitions
// </auto-generated>
//------------------------------------------------------------------------------
namespace Microsoft.Recognizers.Definitions.French
{
	using System;
	using System.Collections.Generic;

	public static class ChoiceDefinitions
	{
		public const string LangMarker = "Fr";
		public const string TokenizerRegex = @"[^\w\d]";
		public const string TrueRegex = @"\b(s[uû]r|ouais|oui|yep|y|sure|approuver|accepter|consentir|d'accord|ça march[eé])\b|(\uD83D\uDC4D|\uD83D\uDC4C)";
		public const string FalseRegex = @"\b(faux|nan|non|pas\s+d'accord|pas\s+concorder|n'est\s+pas\s+(correct|ok)|pas)\b|(\uD83D\uDC4E|\u270B|\uD83D\uDD90)";
	}
}